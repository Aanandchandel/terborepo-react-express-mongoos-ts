// src/routes.tsx (or in App.tsx directly)

export const routes = [
  {
    path: '/',
    element: <><div className="">
         <div className=" bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
      ✅ Tailwind is working!
    </div>
        
        
        </div></>,
    label: 'Home',
  },
  {
    path: '/about',
    element: <>about</>,
    label: 'About',
  },
];
