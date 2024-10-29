// frontend/src/app/components/ClientTestimonials.tsx

import Image from 'next/image'

const reviews = [
    {
        name: "Janis Reeves",
        company: "Coala",
        image: "/images/review1.png",
        rating: 4,
        review: "As a small business owner, finding the right partners for various projects has always been a challenge. This website has been a game-changer! The categorization makes it easy to find exactly what you're looking for, and the quality of professionals listed is top-notch."
    },
    {
        name: "Francis Guzman",
        company: "Metademy",
        image: "/images/review2.png",
        rating: 5,
        review: "As a marketing consultant, I often need to bring in specialists for various projects. Whether I need a graphic designer, a content writer, or a SEO expert, I can always find high-quality professionals here. The platform is user-friendly and has saved me countless hours of searching and vetting."
    },
    {
        name: "Arthur Morgan",
        company: "Outlaw",
        image: "/images/review1.png",
        rating: 4,
        review: "I'm amazed by the range of services available on this platform! As someone working in the creative industry, I've used it to find everything from UX designers to video production teams. It's like having a rolodex of top-tier professionals at your fingertips."
    }
]

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
                <span key={i}>{i < rating ? '★' : <span className="text-gray-300">★</span>}</span>
            ))}
        </div>
    )
}

export default function ClientTestimonials() {
    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-28">
            <div className="mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
                    What Our Clients Say
                </h2>
                <div className="review-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-[#EEEEEE] rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Image className="h-12 w-12 rounded-full mr-4" src={review.image} alt={review.name} width={48} height={48} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                                        <p className="text-sm text-gray-600">{review.company}</p>
                                    </div>
                                </div>
                                <StarRating rating={review.rating} />
                                <p className="text-gray-700">{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}