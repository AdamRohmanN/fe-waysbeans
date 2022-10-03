import logo from '../../assets/logo-heading.svg'
import heading from '../../assets/making-of-coffee.png'
import pattern from '../../assets/wave.svg'
import Header from '../molecules/header'
import products from '../../data/products'
import rupiahFormat from 'rupiah-format'

export default function Home() {
  return (
    <>
    <Header />
    <main>
      <section className='relative grid grid-cols-2 mt-10 mx-44'>
        <div className='absolute -z-20 h-full bg-[#dbb699] w-[92%]'></div>
        <div className='py-16 pl-14'>
          <img className='w-full' src={logo} alt="logo" />
          <h2 className='text-2xl tracking-wide mt-1 mb-6
          2xl:text-6xl'>BEST QUALITY COFFEE BEANS</h2>
          <p className='tracking-wide leading-6
          2xl:text-3xl'>Quality freshly roasted coffee made just for you.<br/>Pour, brew and enjoy</p>
        </div>
        <div className='relative'>
          <img className='w-[80%] my-7 ml-auto' src={heading} alt="coffee-making" />
          <img className='absolute h-24 -z-10 bottom-6
          2xl:hidden'
          src={pattern} alt="pattern" />
        </div>
      </section>
      
      <section className='my-10 mx-44'>
          <ul className='grid grid-cols-4 gap-y-10 gap-x-5
          2xl:grid-cols-5'>
              { products.map((product, index) => (
              <li key={index} className='bg-[#f6e6da]'>
                  <img className='w-full aspect-[241/312] object-cover' src={product.image} alt="item" />
                  <div className='pb-3 px-5'>
                      <h3 className='pt-3 pb-1 font-bold text-[#613D2B] text-lg line-clamp-1'>
                          <span className='uppercase'>{product.name}</span>
                          <span> Beans</span>
                      </h3>
                      <p className='font-semibold text-[#974A4A] line-clamp-1'>{rupiahFormat.convert(product.price).slice(0,-3)}</p>
                      <p className='font-semibold text-[#974A4A] line-clamp-1'>Stock: {product.qty}</p>
                  </div>
              </li>
              ))}
          </ul>
      </section>
    </main>
    </>
  )
}
