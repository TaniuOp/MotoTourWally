// Refactor of api functions (POO)

// Class with all the Api methods 
class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Import methods from the controller and adjust them with class methods (this.)

    // FILTER
    filter() {
        // Change Filtering with query params  (key=value --> page=1) to filtering with Class params 

        // 1- Basic filtering: Create a req.query copy and delete query params not included in the object itself
        const queryObject = { ...this.queryString } // --> const queryObject = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(element => delete queryObject[element])

        // 2- Advance filtering: using JS methods 
        let queryStr = JSON.stringify(queryObject)

        // mongosse operation to replace words
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Mongoose Regular expresion 

        // Database search (Query)
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    // SORT 
    sort() {
        // 3- Sort list 
        if (this.queryString.sort) {         // -->  if (req.query.sort) 
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy) //mongoose method "sort"
        } else {
            this.query = this.query.sort('price')
        }
        return this

    }
    // FIELDS 
    limitFields() {
        // 4- Field limit (just the fields required)
        if (this.queryString.fields) {
            const limitFields = this.queryString.fields.split(',').join('')
            this.query = this.query.select(limitFields) //mongoose method "select"
        }
        return this

    }

    // PAGINATE 
    paginate() {
        // 5- Pagination 
        const page = this.queryString.page || 1;
        const limitResults = this.queryString.limit || 6;
        const skip = (page - 1) * limitResults;
        this.query = this.query.limit(limitResults).skip(skip) //mongoose method "limit"

        // if (this.queryString) {
        //     const totalTours = await Tour.countDocuments();
        //     if (skip >= totalTours) {
        //         throw new Error("This page does not exist")
        //     }
        // }
        return this

    }
}

module.exports = ApiFeatures 



// **** Previous functions refactored from the controller to the util ****  


        // // Filtering with query params  (key=value --> page=1)

        // // 1- Basic filtering: Create a req.query copy and delete query params not included in the object itself
        // const queryObject = {...req.query}
        // const excludeFields = ['page', 'sort', 'limit', 'fields']
        // excludeFields.forEach(element => delete queryObject[element])

        // // 2- Advance filtering: using JS methods 
        // let queryString = JSON.stringify(queryObject)

        //     // mongosse operation to replace words
        //     queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Mongoose Regular expresion 
        
        // // Database search (Query)
        // let searchTours = Tour.find(JSON.parse(queryString))

        // // 3- Sort list 
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join('')
        //     searchTours = searchTours.sort(sortBy) //mongoose method "sort"
        // } 

        // // 4- Field limit (just the fields required)
        // if (req.query.fields) {
        //     const limitFields = req.query.fields.split(',').join('')
        //     searchTours = searchTours.select(limitFields) //mongoose method "select"
        // } 

        // // 5- Pagination 
        // const page = req.query.page || 1 ; 
        // const limitResults = req.query.limit || 6 ;    
        // const skip = (page - 1) * limitResults; 
        // searchTours = searchTours.limit(limitResults).skip(skip) //mongoose method "limit"

        // if (req.query.page){
        //     const totalTours = await Tour.countDocuments();
        //     if (skip >= totalTours){
        //         throw new Error("This page does not exist")
        //     }
        // }
