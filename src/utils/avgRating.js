export default function getAvgRating(allRatings) {
    if(!allRatings || allRatings.length === 0) {
        return 0
    }
    const totalReviews = allRatings?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0)
    const avgReviews = Math.round((totalReviews / allRatings.length) * Math.pow(10, 1)) / Math.pow(10, 1)
    return avgReviews.toFixed(1)
}