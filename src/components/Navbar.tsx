import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartModal from './CartModal';
import { selectCartItemCount } from '../store/cartSelectors';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        fontSize : '10px'
    },
}));


const Navbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCartClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cartItemCount = useSelector(selectCartItemCount);

    return (
        <AppBar position="static">
            <Toolbar className='app-header'>
                <div style={{ flexGrow: 1 }}>
                    <img src="/assets/dh-logo.svg" alt="Company Logo" />
                </div>
                <IconButton aria-label="cart" onClick={handleCartClick}>
                    <StyledBadge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </Toolbar>
            <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </AppBar>
    );
};

export default Navbar;
