import { createContext, useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database';
import { MyGame, CollectionGame } from "../interfaces/interfaces";
import { database } from "../firebase/firebaseConfig";
import { GameContextType, GameProviderType } from "../interfaces/interfaces";

const initialGameContext: GameContextType = {
  loadingMyGames: false,
  myGames: []
}

export const GameContext = createContext<GameContextType>(initialGameContext);

const GameProvider = ({ children }: GameProviderType) => {

  const [loadingMyGames, setLoadingMyGames] = useState<boolean>(false);
  const [myGames, setMyGames] = useState<CollectionGame[]>([]);

  useEffect(() => {
    const gamesRef = ref(database, 'myGames/');

    onValue(gamesRef, (snapshot) => {
      setLoadingMyGames(true);
      const dbData = snapshot.val();

      if (dbData) {
        const dataKeys = Object.keys(dbData);
        const gamesData: MyGame[] = Object.values(dbData);

        const gamesDataWithkeys: CollectionGame[] = gamesData.map((game, index) => {
          const gameWithKey = { ...game, firebaseId: dataKeys[index] }
          return gameWithKey;
        })

        setMyGames(gamesDataWithkeys.sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setMyGames([]);
      }

      setLoadingMyGames(false);
    })
  }, []);

  return (
    <GameContext.Provider value={{ loadingMyGames, myGames }}>
      {children}
    </GameContext.Provider>
  );

}

export default GameProvider