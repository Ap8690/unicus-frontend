import { useEffect, useState, useRef } from "react";
import { getCollectionsSearch } from "../../services/api/supplier";
import Input from "../../components/Input/Input";
import { CircularProgress } from "@mui/material";
import uuid from "react-uuid";

const CollectionSearch = ({ state, setState, title, disableCollection, queryParam }: any) => {
    const focusRef = useRef(null);
    const inputRef = useRef(null);
    const [newItems, setItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestion, setSuggestion] = useState(false);
    const handleOnSearch = async () => {
        try {
          setLoading(true)
            const res = await getCollectionsSearch(50, 0, searchQuery);
            setItems([...res.data]);
            setLoading(false);
            setSuggestion(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if(disableCollection) return
        setSuggestion(true)
        setLoading(true);
        const getData = setTimeout(handleOnSearch, 2000);

        return () => clearTimeout(getData);
    }, [searchQuery]);

    const handleClickOutside = (event: any) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setSuggestion(false);
            return;
        }
    };
    const handleCollectionClick = (it:any) => {
      setState(it.name)
      setSearchQuery(it.name) 
      setSuggestion(false);
    }

    useEffect(() => {
        if(disableCollection) return
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showSuggestion]);
    useEffect(() => {
        if(queryParam && disableCollection) return setSearchQuery(queryParam)
    })
    return (
        <div ref={inputRef}>
            <Input
                title={title}
                placeholder="New Unicus - Collection"
                state={searchQuery}
                setState={setSearchQuery}
                list={"collectionSearch"}
                ref={focusRef}
                onClick={() => setSuggestion(true)}
                disabled={disableCollection}
                text
            />

            <div className="relative flex flex-col">
                {showSuggestion &&
                    (loading ? (
                        <div className="flex justify-center items-center p-2">
                            Searching collection...{" "}
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        newItems.map((it: any) => (
                            <span
                                key={uuid()}
                                className="p-2 capitalize bg-[#2e2d2d] hover:bg-[#1f1e1e]  hover:cursor-pointer"
                                onClick={() => handleCollectionClick(it)}
                            >
                                {it.name}
                            </span>
                        ))
                    ))}
            </div>
        </div>
    );
};

export default CollectionSearch;
