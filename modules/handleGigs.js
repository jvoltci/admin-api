const handleGigs = async (req, res, db) => {
    try {
        const gigs = await db.collection('gigs').find({}).toArray()
        res.json({
            message: 'succes',
            data: gigs
        }).status(201)
    } catch(err) {
        res.json({
            message: 'failed'
        })
    }
}

module.exports = handleGigs