import React from "react";
import { useSelector } from "react-redux/es/exports";
import { selectTodoList } from "../../Store/App/selector";
import { ItemsList } from "../Items/Items";
import './Home.css';

export const Home = () => {
    const items = useSelector(selectTodoList);
    return (
        <div>
            {items.map((i) => <ItemsList key={i.id} item={i}/>)}
        </div>
    )
}