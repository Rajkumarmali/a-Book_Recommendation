import React from 'react';

const Card = (props) => {
    return (
        <div>
            <div className="card mt-3" style={{ "width": '18rem' }}>
                <img src={props.bookItem.cover} className="card-img-top h-200" alt="..." style={{ height: "210px" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.bookItem.title}</h5>
                    <p className="card-text">Auther : {props.bookItem.author}</p>
                    <p className='card-text'>Publication date: {props.bookItem.publication_date}</p>
                    <div className='container w-100'>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
