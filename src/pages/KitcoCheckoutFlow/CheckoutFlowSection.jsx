import {Heading} from '../../components'
import ImgHeader from '../../assets/img_header.svg'
export default function CheckoutFlowSection() {
  return (
    <>
      {/* checkout flow section */}
      <div className="relative h-[3.50rem] content-center self-stretch">
        <Heading
          size="headingxs"
          as="h1"
          className="ml-auto mr- r-[12.25rem] text-[0.88rem] font-bold tracking-[0.00rem] text-white md:mr-0"
        ></Heading>
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 bg-blue_gray-900_01 py-[0.75rem] pl-[10.38rem] pr-[3.50rem] md:px-[1.25rem]">
          {' '}
          <img
            src={ImgHeader}
            alt="Image"
            className="h-[2.00rem] w-[24%] object-contain"
          />
        </div>
      </div>
    </>
  )
}
