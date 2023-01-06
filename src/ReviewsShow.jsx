export function ReviewsShow(props) {
  return (
    <div>
      {props.reviews.map((review) => (
        <div key={review.name} className="reviews">
          <h2>{review.name}</h2>
          <p>Review: {review.rating}</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}
