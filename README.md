# DAWAA

**Live site: https://naman-singh-777.github.io/1MG/**

A demo online-pharmacy web app (static HTML/CSS/vanilla JS, no build step) modelled on Tata 1mg: home, mega-menus, search, product pages with generic alternatives, cart, login, address, payment options and order confirmation.

- **Theme:** blue (trust) + teal/green (healing), Poppins font
- **Languages:** English (default), Hindi, Punjabi (switcher in the header / mobile menu)
- **Catalogue:** 272 medicines and health products plus lab tests. Prices, MRPs and pack sizes come from 1mg listings. Composition and marketer are missing for some items. Ratings and "bought recently" counts are placeholders.
- **Product images:** generated pack art. To use licensed photos, define `window.DAWAA_IMAGES = { <medicine id>: '<image url>' }`.
- **Demo only:** no real payments or orders. Login OTP is `123456`; coupons `DAWAANEW` (min ₹1200), `DAWAA10` (min ₹300), `CARE5`.

Run locally: `python3 -m http.server` and open http://localhost:8000. Deployed to GitHub Pages by `.github/workflows/pages.yml`.
