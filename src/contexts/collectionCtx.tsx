import { Collection } from "@/components/ui/modals/addCollectionModal";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CollectionValue = {
  currentCollection: Collection;
  setCollection: Dispatch<SetStateAction<Collection>>;
};

const defaultContent: CollectionValue = {
  currentCollection: {
    name: "",
    note: "Add images to view them here",
    collectionItem: [],
  },
  setCollection: () => {},
};
export const CollectionContext = createContext(defaultContent);

export default function CollectionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCollection, setCurrentCollection] = useState<Collection>({
    name: "",
    note: "Add images to view them here",
    collectionItem: [],
  });

  return (
    <CollectionContext.Provider
      value={{
        currentCollection,
        setCollection: setCurrentCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
