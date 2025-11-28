import React from 'react'
import Hero from '@/components/common/SubPageHero';
import Feature from './Feature';
import { Separator } from '@/components/ui/separator';
import Publications from './Publications';
import Announcements from './Announcements';
import NewsList from './NewsList';

const NewsAndEvents = () => {
  return (
    <div>
      <Hero/>
      <Publications/>
      <Feature/>
      <NewsList/>
      <Announcements/>

    </div>
  )
}

export default NewsAndEvents
