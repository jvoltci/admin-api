const handleGiggersAssigned = async (req, res, db) => {
    try {
        const { id } = req.params
        const giggers = await db.collection('giggers').find({ gig: id }).toArray()
        res.json({
            message: 'success',
            data: giggers
        }).status(201)
    } catch (err) {
        res.json({message: 'failed'})
    }
}
module.exports = handleGiggersAssigned