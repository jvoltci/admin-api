const handleGiggers = async (req, res, db) => {
    try {
        const status = req.query.assign === 'true' ? 'Assigned' : 'Unassigned'
        const gigs = await db.collection('giggers').find({status: status}).toArray()
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

module.exports = handleGiggers