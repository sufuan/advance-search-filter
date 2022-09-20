const BootCamp = require("../model/BootcampModel")

exports.getall = async (req, res) => {

    const queryObjforSearch = { ...req.query }

    const excludeFields = ['sort', 'page', 'limit']

    // console.log(req.query)
    excludeFields.forEach(val => delete queryObjforSearch[val])

    // console.log(queryObjforSearch);

    let queryString = JSON.stringify(queryObjforSearch)
    // console.log(queryString)

    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

    // console.log(queryString)


    //                    ============   sorting =============

    const queryObj = { ...req.query }
    const removeFields = ['sort', 'page', 'limit']

    removeFields.forEach(val => delete queryObj[val])

    // console.log(req.query);
    // console.log(queryObj)
    let queries = {}
    if (req.query.sort) {
        const sortby = req.query.sort.split(',').join(' ')
        queries.sortby = sortby
        // console.log(queries);
    }





    try {
        const bootcamp = await BootCamp.find(JSON.parse(queryString)).sort(queries.sortby)
        // const bootcamp = await BootCamp.find(JSON.parse(queryString)).sort(queries.sortby)
        res.status(201).json({

            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.createbootcamp = async (req, res) => {
    try {
        const bootcamp = await BootCamp.create(req.body)
        res.status(201).json({
            success: true,
            message: 'data created',
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.singleOne = async (req, res) => {
    try {
        let bootcamp = await BootCamp.findById(req.params.id)
        res.status(200).json(bootcamp)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




exports.updatebootcamp = async (req, res, next) => {
    try {
        let bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true })
        res.status(201).json({
            success: true,
            message: 'data updated',
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

exports.deletebootcamp = async (req, res) => {
    try {
        let bootcamp = await BootCamp.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'data deleted',
            data: bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}