export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)


    // const newNumber = Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD'
    // }).format(number / 100)
    // return newNumber
}
// below new Set(unique) will return unique properties
// allows you to dynamically add new item to categories with no repeats 
// flat() method will give us an array instead of an array of arrays
export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])

    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
