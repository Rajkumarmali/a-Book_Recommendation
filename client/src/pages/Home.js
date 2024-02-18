import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

import './Style.css'

const Home = () => {

    const [bookItem, setBookItem] = useState([])

    const [search, setSearch] = useState('')

    const navigation = useNavigate();

    const loadData = async () => {
        const response = await fetch('http://localhost:3001/displayItem', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        // console.log(responseData[0],responseData[1])
        setBookItem(responseData[0]);
    }
    //console.log(bookItem)
    useEffect(() => {
        loadData();
    }, [])
    const handleBookItemClick = (filterItem) => {
        if (!localStorage.getItem("authToken")) {
            alert("Please login to view book details!");
            navigation('/login');
            return;
        }
        navigation(`/bookDetail/${filterItem._id}`);
    };

    return (
        <div>
            <div>
                <div id="carouselExampleRide" className="carousel slide h-30" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel '>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2 bg-white text-black" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://media.istockphoto.com/id/996690238/photo/head-with-a-bookshelf-in-front-of-black-wall.jpg?s=612x612&w=0&k=20&c=OOEE7sV71PpyKUBGSCOli1tHS12RWollGF5Iu3ngAl8=" className="d-block w-100 " alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://media.istockphoto.com/id/900301626/photo/brown-wooden-shelfs-fully-packed-with-books-in-a-library.jpg?s=612x612&w=0&k=20&c=vhsqZdbeQsYtZ2FToSgl1LvgqZhQ331N8UX_1KGsZBw=" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" >
                            <img src="https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container' >
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {
                        (bookItem) ? bookItem.filter((item) =>
                            ((item.title.toLowerCase().includes(search.toLocaleLowerCase())) || (item.author.toLowerCase().includes(search.toLocaleLowerCase())))
                        )
                            .map(filterItem => {
                                return (
                                    <div key={filterItem._id} className='col'>
                                        <button
                                            className='btn'
                                            onClick={() => handleBookItemClick(filterItem)}
                                        >
                                            <Card bookItem={filterItem} />
                                        </button>
                                    </div>
                                )
                            }) : ""
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
