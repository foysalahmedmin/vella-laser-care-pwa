import {
  SetCartAddress,
  SetCartCity,
  SetCartEmail,
  SetCartName,
  SetCartPaymentMethod,
  SetCartPhone,
  SetCartPostal,
  SetCartProductQuantity,
  SetResetCart,
} from "@/redux/slices/cart-slice";
import type { RootState } from "@/redux/store";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const cartProducts = useMemo(
    () => cart.products.filter((product) => product.quantity > 0),
    [cart.products],
  );

  const subtotal = useMemo(
    () =>
      cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartProducts],
  );

  const totalItems = useMemo(
    () => cart.products.reduce((sum, item) => sum + item.quantity, 0),
    [cart.products],
  );

  const totalDiscount = useMemo(
    () =>
      cartProducts.reduce(
        (sum, item) => sum + (item.discount_amount || 0) * item.quantity,
        0,
      ),
    [cartProducts],
  );

  const updateQuantity = useCallback(
    (index: number, quantity: number) => {
      if (quantity < 1) return;

      const updatedProducts = [...cart.products];
      updatedProducts[index].quantity = quantity;
      dispatch(SetCartProductQuantity(updatedProducts));
    },
    [cart.products, dispatch],
  );

  const removeItem = useCallback(
    (index: number) => {
      const updatedProducts = [...cart.products];
      updatedProducts[index].quantity = 0;
      dispatch(SetCartProductQuantity(updatedProducts));
    },
    [cart.products, dispatch],
  );

  const updateField = useCallback(
    (field: string, value: string) => {
      const actions = {
        name: SetCartName,
        email: SetCartEmail,
        phone: SetCartPhone,
        address: SetCartAddress,
        city: SetCartCity,
        postal: SetCartPostal,
        payment_method: SetCartPaymentMethod,
      };

      if (actions[field as keyof typeof actions]) {
        dispatch(actions[field as keyof typeof actions](value));
      }
    },
    [dispatch],
  );

  const resetCart = useCallback(() => {
    dispatch(SetResetCart());
  }, [dispatch]);

  const isEmpty = cartProducts.length === 0;

  return {
    cart,
    cartProducts,
    subtotal,
    totalItems,
    totalDiscount,
    isEmpty,
    updateQuantity,
    removeItem,
    updateField,
    resetCart,
  };
};

export default useCart;
