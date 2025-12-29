import toast from "react-hot-toast";

export async function clearCart(token: string, setCartData: (data: any) => void) {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'DELETE',
            headers: {
                token: token,
            }
        });

        const data = await res.json();

        if (data.message === 'success') {
            setCartData(null);
            return true;
        } else {
            toast.error(data.message || 'Failed to clear cart');
            return false;
        }
    } catch (error) {
        toast.error('Something went wrong. Please try again.');
        console.error('Clear cart error:', error);
        return false;
    }
}