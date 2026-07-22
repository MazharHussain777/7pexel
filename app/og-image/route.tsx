// app/og-image/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '7pexel - Tech Insights';
    const brand = searchParams.get('brand') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#7F011F',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FDFAF5',
              borderRadius: '32px',
              padding: '60px',
              width: '100%',
              height: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 800,
                color: '#7F011F',
                marginBottom: 20,
                fontFamily: 'Poppins',
                textAlign: 'center',
              }}
            >
              {brand && <span style={{ color: '#2d1a1a' }}>{brand} </span>}
              {title}
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#6d4a4a',
                fontFamily: 'Poppins',
              }}
            >
              7pexel — Premium Tech Insights
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 40,
                gap: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: '#7F011F',
                  padding: '8px 24px',
                  borderRadius: 50,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Read Review
              </div>
              <div
                style={{
                  border: '2px solid #7F011F',
                  padding: '8px 24px',
                  borderRadius: 50,
                  color: '#7F011F',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Compare Phones
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}