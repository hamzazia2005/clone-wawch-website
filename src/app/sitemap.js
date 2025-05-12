// app/sitemap.js

// import { getSortedPostsData } from "../lib/posts";

import { serverAxios } from '@/utils/axios_clients';

async function getServerSideData(url = '') {
  try {
    const response = await serverAxios.get(url);
    // Ensure we return an array even if the response is empty or invalid
    return response.data?.data || [];
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message || 'Unknown error');
    // Return an empty array instead of throwing an error
    return [];
  }
}

export default async function sitemap() {
  try {
    // Get your data
    const blogs = await getServerSideData('api/blogs?populate=*');
    const faqs = await getServerSideData('api/faqs?populate=*');
    const services = await getServerSideData('api/services?populate=*');
    
    // Ensure each data source is an array before mapping
    const blogEntries = Array.isArray(blogs) ? blogs.map(blog => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.attributes.slug}`,
      lastModified: new Date(blog.attributes.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })) : [];
    
    const faqEntries = Array.isArray(faqs) ? faqs.map(faq => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
      lastModified: new Date(faq.attributes.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    })) : [];
    
    const serviceEntries = Array.isArray(services) ? services.map(service => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${service.attributes.slug}`,
      lastModified: new Date(service.attributes.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })) : [];
    
    // Static routes
    const routes = [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      // Add other static routes as needed
    ];
    
    // Combine all entries
    return [...routes, ...blogEntries, ...faqEntries, ...serviceEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least the static routes if there's an error
    return [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ];
  }
}
