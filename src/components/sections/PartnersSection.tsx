import { CustomersSection, type CustomerLogo } from '@/components/ui/customers-section'
import SectionLabel from '@/components/ui/SectionLabel'

// Default CDN placeholder logos — replaced when Sanity partner logos have images
const defaultPartners: CustomerLogo[] = [
  { src: 'https://html.tailus.io/blocks/customers/nvidia.svg', alt: 'Lake Steel', height: 24 },
  { src: 'https://html.tailus.io/blocks/customers/github.svg', alt: 'Kamal Steel', height: 20 },
  { src: 'https://html.tailus.io/blocks/customers/openai.svg', alt: 'Lodhia', height: 24 },
  { src: 'https://html.tailus.io/blocks/customers/column.svg', alt: 'Steelmast', height: 20 },
  { src: 'https://html.tailus.io/blocks/customers/laravel.svg', alt: 'Metro Group', height: 20 },
  { src: 'https://html.tailus.io/blocks/customers/lilly.svg', alt: 'Sita Steel', height: 28 },
]

interface PartnersSectionProps {
  partners?: CustomerLogo[]
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const logos = partners?.length ? partners : defaultPartners

  return (
    <section className="bg-navy">
      <div className="max-w-container mx-auto px-6 lg:px-10 pt-section-sm pb-0 text-center">
        <SectionLabel light className="mb-4">
          Industry Partners
        </SectionLabel>
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
          Trusted by Tanzania's Leading Steel Companies
        </h2>
      </div>

      <CustomersSection
        customers={logos}
        className="!bg-navy !pt-0 [&_span]:text-white [&_a]:text-gold"
      />
    </section>
  )
}
