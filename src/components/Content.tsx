import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { AppDispatch } from '../store/reduxTypes';
import { addToCart } from '../store/cartActions'; 



interface Car {
    metadata: { tags: string[] };
    sys: {
        id: string
    };
    fields: {
        title: string;
        price: number;
        photo: string;
    };
}

interface Item {
    id: string;
    title: string;
    price: number;
    photo: string;
    amount: number
}

interface CarsResponse {
    items: Car[];
}

function Content() {
    const [cars, setCars] = useState<Car[]>([]);
    const accessToken = 'VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o';

    const dispatch: AppDispatch = useDispatch(); 



    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response: AxiosResponse<CarsResponse> = await axios.get(
                    'https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setCars(response.data.items);
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchCars();
    }, []);

    const handleAddToCart = (car: Car) => {
        const item: Item = {
            id: car.sys.id, 
            title: car.fields.title,
            price: car.fields.price,
            photo: car.fields.photo,
            amount: 1
        };
        dispatch(addToCart(item));
    };

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    marginTop: '1rem',
                }}
            >
                {cars.map((car, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: '300px',
                            height: '100%',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={car.fields.photo}
                            alt={car.fields.title}
                            style={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <div style={{ marginBottom: '1rem' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {car.fields.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {car.fields.price} THB/Day
                                </Typography>
                            </div>

                            <Button
                                variant='contained'
                                color="primary"
                                fullWidth
                                onClick={() => handleAddToCart(car)}
                            >
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default Content;
