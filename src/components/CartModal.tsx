import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Item } from '../store/types'
import { RootState } from '../store';
import { increaseCartItemQuantity, decreaseCartItemQuantity } from '../store/cartActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';


interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    // Get the cart items from the Redux store

    const [couponCode, setCouponCode] = useState(''); // Declare couponCode state
    const cartItems = useSelector((state: RootState) => state.cart);
    // Calculate subtotal, discountAmount, and grandTotal based on cartItems
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
    const discountPercentage = 10; // Example discount percentage
    const discountAmount = (subtotal * discountPercentage) / 100;
    const grandTotal = subtotal - discountAmount;

    const dispatch = useDispatch();


    const handleIncreaseQuantity = (itemId: string) => {
        dispatch(increaseCartItemQuantity(itemId)); // Dispatch action to increase quantity
    };

    const handleDecreaseQuantity = (itemId: string) => {
        dispatch(decreaseCartItemQuantity(itemId)); // Dispatch action to decrease quantity
    };


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="cart-modal-title"
            aria-describedby="cart-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" gutterBottom>
                    Your Cart
                </Typography>
                {cartItems.map(item => (
                    <div key={item.id} style={{ marginBottom: '20px' }}>
                        <Card style={{ padding: '10px', }}>
                            <div style={{
                                display: 'flex',
                                alignContent: 'flex-end',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', }}>
                                    <CardMedia
                                        component="img"
                                        height="50"
                                        image={item.photo}
                                        alt={item.title}
                                        style={{ objectFit: 'cover', marginRight: '5px' }}
                                    />
                                    <div>
                                        <Typography variant='caption' style={{ fontWeight: 'bold' }}>
                                            {item.title}
                                        </Typography>
                                        <br />
                                        <Typography variant='caption'>
                                            {item.price}/day
                                        </Typography>
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                            style={{ maxWidth: '20px' }}
                                        >
                                            -
                                        </Button>
                                        <span style={{ margin: '0 10px', fontSize: '15px' }}>{item.amount}</span>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>



                        </Card>
                    </div>
                ))}
                <TextField
                    label="Discount Coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    sx={{ marginTop: 2 }}
                    size="small"
                    fullWidth
                />
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Subtotal:</span>
                        <span>{subtotal} THB</span>
                    </div>
                </Typography>
                <Divider />
                <Typography variant="subtitle1">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Discount: </span>
                        <span>{discountAmount} THB</span>
                    </div>
                </Typography>
                <Divider />
                <Typography variant="subtitle1">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Grand Total: </span>
                        <span>{grandTotal} THB</span>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default CartModal;
