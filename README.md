# DAWAA

A demo online-pharmacy web app (static HTML/CSS/vanilla JS, no build step) with the same page structure and flows as a large Indian online pharmacy: home, mega-menus, search, product pages with generic alternatives, cart, login (demo OTP), address, payment options and order confirmation.

- **Theme:** blue (trust) + teal/green (healing), Poppins font
- **Languages:** English (default), Hindi, Punjabi (switcher in the header / mobile menu)
- **Catalogue:** ~270 illustrative medicines and health products plus lab tests. Prices and descriptions are demo data, not real listings.
- **Demo only:** no real payments or orders. Demo login OTP is `123456`; coupons `DAWAANEW` (min ₹1200), `DAWAA10` (min ₹300), `CARE5`.

Run locally: `python3 -m http.server` and open http://localhost:8000. Deployed by `.github/workflows/pages.yml` to GitHub Pages.
