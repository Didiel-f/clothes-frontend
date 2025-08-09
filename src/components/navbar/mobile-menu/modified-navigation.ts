import { Menu } from "models/Navigation.model";

// MODIFY THE NAVIGATION WITH NEW STRUCTURE
export const updateNavigation = (navigation: Menu[]) => {
  return navigation.map((curr) => {
    return { title: curr.title, child: curr.child };
  });
};
