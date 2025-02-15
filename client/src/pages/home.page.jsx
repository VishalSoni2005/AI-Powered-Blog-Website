import React from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from '../components/inpage-navigation.component'

export default function HomePage() {
  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10'> 
            {/* latest blogs */}
          <div className='w-full '>
            <InPageNavigation defaultHidden={["trending blogs"]} routes={["home", "trending blogs"]}>

            </InPageNavigation>
          </div>

          {/* popular blogs and filter */}
          <div>

          </div>
        </section>
    </AnimationWrapper>
  )
}
