import { useState } from "react"

const RatingComponent = ({ isDisplay = false, ratingValue = 0 }) => {
    const [rating, setRating] = useState(0)

    const handleRating = (value) => {
        setRating(value)
    }

    const starsToRender = [1, 2, 3, 4, 5]

    return (
        <div>
            {starsToRender.map((star) => (
                <i
                    key={star}
                    className={`bi ${
                        (isDisplay ? ratingValue : rating) >= star
                            ? "bi-star-fill text-warning"
                            : "bi-star"
                    } px-1`}
                    style={{ cursor: isDisplay ? "default" : "pointer" }}
                    onClick={() => !isDisplay && handleRating(star)}
                ></i>
            ))}
        </div>
    )
}

export default RatingComponent