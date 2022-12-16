import { Outlet } from "react-router-dom";
import NavbarSection from "../components/NavbarSection";
import FooterSection from "../components/FooterSection";

export default function Dashboard(props) {
  return (
    <>
      <NavbarSection
        key={props.cartItems}
        lightMode={props.lightMode}
        toggleMode={props.toggleMode}
        cartItems={props.cartItems}
        removeItem={props.removeItem}
        checkout={props.checkout}
      />
      <Outlet />
      <FooterSection lightMode={props.lightMode} />
    </>
  );
}
