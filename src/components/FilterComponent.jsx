
const FilterComponent = ({filter, setFilter, categories}) => {
    

    const handlePriceRange = (e) => {
        setFilter({...filter ,priceRange: e.target.value})
       
    }
    const handleRating = (e) => {
        setFilter({...filter, rating: e.target.value})
    }

    const handleCategoryInput = (e) => {
        const {checked, value, name} = e.target
        console.log(checked, value, name)

        setFilter(prevState => ({
            ...prevState,
            categories:  checked ? [...prevState.categories, value] //Adds if checked
            : prevState.categories.filter(cat => cat != value)
        }))


    }

    return (
        <div className="card p-2">
                      <div className="d-flex justify-content-between">
                            
                            <div>
                                <h4>Filters</h4>
                            </div>
                            <div>
                                <p><button onClick={() => setFilter({priceRange: 0, sortByPrice: "", rating: 0, categories: []})} className="btn btn-sm btn-light">Clear</button></p>
                            </div>
                      </div>
 
                        <div className="card px-2 py-2">
                            <label htmlFor="priceRange" className="form-label text-center"><p className="py-0.5">Set Price</p> <input className="form-control text-center" type="number"  onChange={(e) => setFilter({...filter, priceRange: e.target.value })} value={filter.priceRange} /> </label>
                            <input type="range" className="form-range" min="1000" max="150000" onChange={handlePriceRange} step="500" id="priceRange" value={filter.priceRange}></input>
                        </div>

                        <div className="card my-2 p-2 text-center">
                            <p>Sort By Price</p>
                            <div>
                                <input type="radio" name="sortByPrice" value="lowToHigh" onChange={(e) => setFilter({...filter, sortByPrice: e.target.value })} checked={filter.sortByPrice === "lowToHigh"}  />
                                <label htmlFor="sortByPrice" className="form-label px-2">Low to High</label>
                            </div>
                            <div>
                                <input type="radio" name="sortByPrice" value="highToLow" onChange={(e) => setFilter({...filter, sortByPrice: e.target.value })} checked={filter.sortByPrice === "highToLow"} />
                                <label htmlFor="sortByPrice" className="form-label px-2">High to Low</label>
                            </div>
                            

                        </div>

                        <div className="card p-2 text-center">

                            <label htmlFor="rating" className="form-label text-center"><p className="py-0.5">Choose Rating</p> <input className="form-control text-center" type="number"  onChange={(e) => setFilter({...filter, rating: e.target.value })} value={filter.rating} /> </label>
                            <input type="range" className="form-range" min="1" max="5" onChange={handleRating} step="0.1" id="rating" value={filter.rating}></input>
                            
                        </div>

                        <div className="card p-2 mt-2">
                            <p className="text-center">Category</p>

                                {
                                    categories.map(cat => (
                                       <div key={`${cat._id}`}>
                                           <input checked={filter.categories.includes(cat.name)} onChange={handleCategoryInput} type="checkbox" value={`${cat.name}`} name={`cat.name`} className="mx-2" /> {cat.name}
                                       </div>
                                    ))
                                }

                            
                        </div>

        </div>
    )
}

export default FilterComponent