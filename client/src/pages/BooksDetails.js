import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const BooksDetails = () => {
    const { bookId } = useParams();
    const [bookDetail, setBookDetail] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("")

    const userEmail = localStorage.getItem("userEmail")
    // console.log(userEmail);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(rating)
        // console.log(comment)
        try {
            const response = await fetch("http://localhost:3001/review", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId: bookId, rating: rating, commnet: comment, userEmail: userEmail })
            })
            if (response.ok) {
                // Clear form inputs
                setRating(1);
                setComment('');
                // Reload the page
                window.location.reload();
            }
        } catch (err) {
            console.log(err)
        }
    }


    const fetchBookDetail = async () => {
        const response = await fetch("http://localhost:3001/bookdetail", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: bookId })
        })
        const data = await response.json();
        setBookDetail(data);
        // console.log(bookDetail)
    }
    const fetchReview = async () => {
        const response = await fetch("http://localhost:3001/review/get", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookId: bookId })
        })
        const data = await response.json();
        setReview(data)
        // console.log(review)
    }
    useEffect(() => {
        fetchBookDetail()
        fetchReview()
    }, [])



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <img src={bookDetail?.cover} alt='' />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3>Title : {bookDetail?.title}</h3>
                            <h4>Author : {bookDetail?.author}</h4>
                            <h4>Publication date : {bookDetail?.publication_date}</h4>
                            {/* <h5>Price : {bookDetail?.price} Rs</h5> */}
                            <h6>description : {bookDetail?.description}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input className="form-control" type='number' min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="comment" className="form-label">Comment: </label>
                        <input className='form-control' type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <hr />
            <div>
                <h2>Reviews</h2>
                {review && review.map(review => (
                    <div>
                        <div key={review._id} className="card">
                            <div className="card-body">
                                <p className='card-title'> User: {review.userEmail}</p>
                                <p>Reviewed on: {new Date(review.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                <p className="card-text">Rating :
                                    {[...Array(Math.floor(review.rating))].map((_, index) => (
                                        <BsStarFill style={{ color: "gold" }} key={index} />
                                    ))}
                                    {review.rating % 1 !== 0 && <BsStarHalf />}
                                    {[...Array(5 - Math.ceil(review.rating))].map((_, index) => (
                                        <BsStar key={index} />
                                    ))}
                                </p>
                                <p className="card-text">Comment : {review.commnet}</p>
                            </div>
                        </div>
                        <br />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default BooksDetails;
