import { Navlink } from "./navlink";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface INavbarProps {
  currentUser?: string | null;
  children: React.ReactElement;
}

export const Navbar: React.FC<INavbarProps> = ({ children, currentUser }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">{children}</SheetTrigger>
      <SheetContent side="left" className="md:hidden">
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-semibold">
            <span className="text-blue-600">Market</span>Place
          </SheetTitle>
        </SheetHeader>
        <Navlink currentUser={currentUser} />
      </SheetContent>
    </Sheet>
  );
};
