import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const defaultTitle = 'RafalW3bCraft - Cybersecurity & AI Engineering';
<<<<<<< HEAD
const defaultDescription = 'Elite cybersecurity engineer specializing in AI automation, red team operations, and secure application development. Forging future-ready cyber solutions.';
=======
const defaultDescription = 'Forging Future-Ready Cyber Solutions. Secure. Smart. Excellence. Advanced cybersecurity engineering, app development, and strategic defense solutions.';
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
const defaultOgImage = '/og-image.png';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rafalw3bcraft.vercel.app';

export function SEOHead({
  title,
  description = defaultDescription,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [
    'cybersecurity',
    'AI automation',
    'red team',
    'penetration testing',
    'security engineering',
    'full-stack development',
    'telegram bots',
    'blockchain',
    'Python',
    'React'
  ],
  author = 'RafalW3bCraft',
  publishDate,
  modifiedDate,
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | RafalW3bCraft` : defaultTitle;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default structured data for the organization
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'RafalW3bCraft',
    jobTitle: 'Cybersecurity Engineer & AI Specialist',
    description: description,
    url: siteUrl,
    sameAs: [
      'https://github.com/RafalW3bCraft',
      'https://t.me/RafalW3bCraft',
      'https://x.com/RafalW3bCraft',
      'https://www.reddit.com/user/Geraki_init/',
    ],
    knowsAbout: [
      'Cybersecurity',
      'Artificial Intelligence',
      'Penetration Testing',
      'Red Team Operations',
      'Full-Stack Development',
      'Blockchain Technology',
      'Python Programming',
      'React Development'
    ],
    email: 'thewhitefalcon13@proton.me',
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
<<<<<<< HEAD
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
=======

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={title || 'RafalW3bCraft Cybersecurity Portfolio'} />
      <meta property="og:site_name" content="RafalW3bCraft" />
      <meta property="og:locale" content="en_US" />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@RafalW3bCraft" />
      <meta name="twitter:creator" content="@RafalW3bCraft" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Article Meta (for blog posts) */}
      {ogType === 'article' && publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          {modifiedDate && (
            <meta property="article:modified_time" content={modifiedDate} />
          )}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
          {keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword} />
          ))}
        </>
      )}
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#00ff9f" />
      <meta name="msapplication-TileColor" content="#000000" />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.github.com" />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Additional Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      {/* Performance Hints */}
      <link rel="prefetch" href="/api/github/projects" />
      <link rel="prefetch" href="/api/blog/posts" />
    </Head>
  );
}