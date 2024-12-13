import axios from "axios"
import { useEffect, useState } from "react";

export default function useFetch(){
    const [news, setNews] = useState(null);
    
            
    useEffect(() => {
        articles();
    }, []);
    return {
        news
    }
}