import React, { useState, useEffect } from 'react';
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
import axios, { AxiosResponse, AxiosError } from 'axios';


interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Discount {
    metadata: { tags: string[] };
    sys: {
        id: string
    };
    fields: {
        amount: number
        code: string
    };
}


interface DiscountsResponse {
    items: Discount[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {

    const accessToken = 'VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o';
    const [discount, setDiscount] = useState<Discount[]>([])
    const [couponCode, setCouponCode] = useState('');
    const cartItems = useSelector((state: RootState) => state.cart);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
    const discountPercentage = 10;
    const discountAmount = (subtotal * discountPercentage) / 100;
    const grandTotal = subtotal - discountAmount;

    const dispatch = useDispatch();


    const handleIncreaseQuantity = (itemId: string) => {
        dispatch(increaseCartItemQuantity(itemId));
    };

    const handleDecreaseQuantity = (itemId: string) => {
        dispatch(decreaseCartItemQuantity(itemId));
    };

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const response: AxiosResponse<DiscountsResponse> = await axios.get(
                    'https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setDiscount(response.data.items);
                console.log('discount : ', response.data.items)
            } catch (error: any) {
                console.error('Error:', error.message);
            }
        };

        fetchDiscount();
    }, []);

    const totalPriceBeforeDiscount = cartItems.reduce(
        (total, item) => total + item.price * item.amount,
        0
    );

    const handleApplyCoupon = () => {
        const appliedDiscount = discount.find(item => item.fields.code === couponCode);

        if (appliedDiscount) {
            const couponDiscountPercentage = appliedDiscount.fields.amount / 100;
            const newDiscountAmount = (subtotal * couponDiscountPercentage);
            const newGrandTotal = subtotal - newDiscountAmount;


            const discountAmountElement = document.getElementById('discountAmount');
            if (discountAmountElement) {
                discountAmountElement.textContent = `${newDiscountAmount.toFixed(2)} THB`;
            }

            const grandTotalElement = document.getElementById('grandTotal');
            if (grandTotalElement) {
                grandTotalElement.textContent = `${newGrandTotal.toFixed(2)} THB`;
            }
        } else {
            return
        }
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
                                            {item.price}/Day
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
                <Button
                    variant="outlined"
                    onClick={handleApplyCoupon}
                    sx={{ marginTop: 1 }}
                >
                    Apply Coupon
                </Button>
                <Typography variant="subtitle1">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Total Before Discount: </span>
                        <span>{totalPriceBeforeDiscount} THB</span>
                    </div>
                </Typography>
                <Divider />
                <Typography variant="subtitle1">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Discount: </span>
                        <span id="discountAmount">{discountAmount.toFixed(2)} THB</span>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};

export default CartModal;
