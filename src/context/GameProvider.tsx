import { createContext, useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database';
import { FirebaseGame, CollectionGame } from "../types/types";
import { database } from "../firebase/firebaseConfig";
import { GameContextType, GameProviderProps } from "../types/types";

const initialGameContext: GameContextType = {
  loadingGames: false,
  firebaseGamesWithKeys: []
}

export const GameContext = createContext<GameContextType>(initialGameContext);

const GameProvider = ({ children }: GameProviderProps) => {

  const [loadingGames, setLoadingGames] = useState<boolean>(false);
  const [firebaseGamesWithKeys, setFirebaseGamesWithKeys] = useState<CollectionGame[]>([]);

  useEffect(() => {
    const gamesRef = ref(database, 'myGames/');

    onValue(gamesRef, (snapshot) => {
      setLoadingGames(true);
      const dbData = snapshot.val();

      if (dbData) {
        const dataKeys = Object.keys(dbData);
        const fbaseGames: FirebaseGame[] = Object.values(dbData);

        const fbaseGamesWithKeys: CollectionGame[] = fbaseGames.map((game, index) => {
          const firebaseGameWithKey = { ...game, firebaseId: dataKeys[index] }
          return firebaseGameWithKey;
        })

        setFirebaseGamesWithKeys(fbaseGamesWithKeys.sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setFirebaseGamesWithKeys([]);
      }

      setLoadingGames(false);
    })
  }, []);

  return (
    <GameContext.Provider value={{ loadingGames, firebaseGamesWithKeys }}>
      {children}
    </GameContext.Provider>
  );

}

export default GameProvider