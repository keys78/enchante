import { useAppSelector } from '../../network/hooks'

const SavedItems = () => {
  const { user } = useAppSelector(state => state.user)
  return (
    <div>
      {user?.savedItems.map((item) => 
      <div>
        <h1>{item.name}</h1>
        <h1>{item.price}</h1>
      </div>
      )}
    </div>
  )
}

export default SavedItems