import { Splide, SplideSlide } from '@splidejs/react-splide'
import { ArrowUpRight } from 'lucide-react'
import '@splidejs/react-splide/css'

const CasesSlider = ({ items }) => {
  const options = {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: '1.4rem',
    pagination: true,
    arrows: true,
    focus: 'left',
    keyboard: 'global',
    slideFocus: true,
    breakpoints: {
      1280: { perPage: 3.2 },
      980: { perPage: 2.8 },
      768: { perPage: 1.5 },
      480: { perPage: 1.3 },
    },
  }

  return (
    <>
      <Splide
        options={options}
        className="cases-slider ml-10 md:ml-26 pb-10 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, index) => (
          <SplideSlide key={`${item.title}-${index}`}>
            <div className="relative isolate h-full rounded-3xl overflow-hidden shadow-[-10px_10px_20px_rgba(0,0,0,0.50)] will-change-transform backdrop-blur-md before:content-[''] before:absolute before:z-15 before:inset-0 before:rounded-[inherit] before:bg-transparent before:shadow-[inset_0_0_10px_rgba(255,255,255,0.30)] before:pointer-events-none">
              {/* Image */}
              <div className="relative z-10 h-54 w-full overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:z-10 before:pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-0 h-full w-full object-cover"
                />
              </div>

              {/* shadow center */}
              <div className="absolute z-10 -left-4 top-[52%] w-200 h-14 bg-(--surface-primary) blur-[6px] pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col gap-2">
                {/* Glow */}
                <div className="absolute left-0 bottom-0 w-[70%] h-120 rounded-full rotate-180 bg-linear-to-br from-(--color-primary) to-(--color-secundary) blur-[70px] opacity-12 pointer-events-none" />
                <h3 className="text-white font-semibold text-2xl -mt-4">{item.title}</h3>
                <p className="text-(--text-secundary) text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <button
                  className="mt-2 w-fit text-xs text-(--text-primary) font-medium px-3 py-1.5 rounded-xl inline-flex items-center gap-2 bg-white/5 border border-(--color-border) backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer relative z-30"
                  aria-label={`Ver más sobre ${item.title}`}
                >
                  Ver mas
                  <ArrowUpRight className="w-3.5 h-3.5 text-(--color-primary)" />
                </button>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <style>{`
       .cases-slider .splide__pagination {
          bottom: -0.2rem;
        }

        .cases-slider .splide__arrow {
          background: transparent;
          backdrop-filter: blur(10px);
          scale: 1.3;
        }

        .cases-slider .splide__arrow--prev {
          left: -40px;
        }

        .cases-slider .splide__arrow--next {
          right: -20px;
          z-index: 20;
        }

        .cases-slider .splide__arrow svg {
          fill: #fff;
        }

        .cases-slider .splide__pagination__page.is-active {
          background: var(--color-primary);
        }
        
        @media (width <= 768px) {
            .cases-slider .splide__arrow--next {
              right: 0px;
            }
        }
      `}</style>
    </>
  )
}

export default CasesSlider
