import {Navbar, NavbarBrand, NavbarContent, Avatar,} from "@nextui-org/react";

export default function UserNavbar() {
  return (
    <Navbar className="">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        {/* <p className="font-bold text-inherit">ACME</p> */}
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={'vite.svg'}
            />
          {/* <Button isIconOnly>
            <MoonIcon size={18}/>
          </Button> */}
      </NavbarContent>
    </Navbar>
  );
}
