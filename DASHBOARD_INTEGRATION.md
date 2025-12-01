# Dashboard Integration Setup

## Environment Configuration

To enable the pricing plan redirect to the dashboard, you need to configure the dashboard URL.

### Setting Up the Dashboard URL

Add the following environment variable to your `.env` or `.env.local` file:

```env
NEXT_PUBLIC_DASHBOARD_URL=https://your-dashboard-url.com
```

### Examples:

**Production (Custom Domain):**
```env
NEXT_PUBLIC_DASHBOARD_URL=https://app.wawcd.com
```

**Production (Replit):**
```env
NEXT_PUBLIC_DASHBOARD_URL=https://your-replit-app-name.replit.app
```

**Local Development:**
```env
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:5000
```

### Default Value

If the environment variable is not set, the system defaults to:
```
https://app.wawcd.com
```

## How It Works

When a user selects a pricing plan on the website:
1. The plan ID, billing period, price, and currency are extracted
2. A checkout URL is generated with these parameters
3. User is redirected to: `{DASHBOARD_URL}/checkout/{plan}?billing={period}&price={amount}&currency={code}`
4. The dashboard checkout page reads these parameters and displays the correct information

## Supported Plans

- **Basic/Starter** → Plan ID: `basic`
- **Pro/Professional** → Plan ID: `pro`
- **Premium/Enterprise** → Plan ID: `premium`

## Testing

After setting up the environment variable:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the pricing page: `http://localhost:3000/pricing`

3. Click on any "Get Started" button

4. Verify the redirect URL includes the correct parameters

## Troubleshooting

**Issue**: Redirects to wrong URL
- **Solution**: Check that `NEXT_PUBLIC_DASHBOARD_URL` is set correctly in `.env.local`
- **Note**: After changing environment variables, restart the Next.js development server

**Issue**: Parameters not showing in URL
- **Solution**: Check browser console for errors
- **Verify**: Plan data from CMS includes required fields (title, price, currency)

**Issue**: Currency or price showing incorrect values
- **Solution**: Verify the country detection middleware is working
- **Check**: Cookie `user-country` is being set correctly

## Required CMS Fields

Ensure your Strapi pricing data includes:
- `title` - Plan name (used for plan ID mapping)
- `new_price_monthly` / `new_price_yearly` - Current prices
- `currency` - Default currency code
- Country-specific price fields (optional):
  - `{country}_new_price_monthly`
  - `{country}_new_price_yearly`
  
Example country codes: `inr`, `pkr`, `aed`, `brl`, `egp`, `idr`, `myr`, `qar`, `sar`

