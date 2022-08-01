export const ItemsList = ({item}) => {
    return (
        <div>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.assignee}</div>
        </div>
    )
}