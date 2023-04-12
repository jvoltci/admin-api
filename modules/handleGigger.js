const handleGigger = async (req, res, db) => {
    try {
        const { assign, gig, gigger } = req.body
        if (assign) {
            const result = await db
                .collection('giggers')
                .updateOne({ id: gigger }, { $set: { status: 'Assigned', gig: gig } })
            if (result) {
                const count = await db.collection('giggers')
                    .find({ gig: gig, status: 'Assigned' }).toArray()
                await db.collection('gigs').updateOne({ id: gig }, { $set: { giggers: count.length } })
            }
            res.json({
                message: 'success',
                data: result[0]
            })
        }
        else {
            const result = await db
                .collection('giggers')
                .updateOne({ id: gigger }, { $set: { status: 'Unassigned', gig: '' } })
            if (result) {
                const count = await db.collection('giggers')
                    .find({ gig: gig, status: 'Assigned' }).toArray()
                await db.collection('gigs').updateOne({ id: gig }, { $set: { giggers: count.length } })
            }
            res.json({
                message: 'success',
                data: result[0]
            })
        }
    } catch (err) {
        res.json({ message: 'failed', detail: err.message })
    }
}

module.exports = handleGigger