const handleAllocate = async (req, res, db) => {
    try {
        const { gig } = req.body
        const result = await db
            .collection('giggers')
            .updateMany({ gig: gig }, { $set: { status: 'Allocated' } })
        if (result) {
            await db.collection('gigs').updateOne({ id: gig }, { $set: { giggers: 0 } })
        }
        res.json({
            message: 'success',
            data: result[0]
        })
    } catch (err) {
        res.json({ message: 'failed', detail: err.message })
    }
}

module.exports = handleAllocate