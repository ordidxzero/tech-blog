import React from 'react';
import Layout from '../components/core/layout';
import SEO from '../components/core/seo';
import CytoscapeNavigator from '../components/post/cytoscapeNavigator';
import Utterances from '../components/post/Utterances';
import { ITemplateProps } from '../interfaces';
import 'katex/dist/katex.min.css';
import Footer from '../components/core/footer';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  excerpt: string;
  title: string;
  tag: string[];
  prevStep: string[];
  category: string[];
  birthTime: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { html: __html, title, birthTime, category, excerpt } = props.pageContext;
  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <div className="post-container w-full h-full lg:max-w-3xl mx-auto mt-12 dark:text-warmGray-300 duration-300">
        <div className="flex flex-col justify-start items-center mb-20">
          <h1 className="m-0 mb-1 font-bold">{title}</h1>
          <div className="post-info text-xs flex justify-center items-center">
            <span>{birthTime}</span>
            {category &&
              category.map(item => (
                <span key={item} className="capitalize">
                  <span className="mx-1">·</span>
                  {item}
                </span>
              ))}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html }}></div>
      </div>
      <CytoscapeNavigator />
      <Utterances />
      <Footer />
    </Layout>
  );
});

export default React.memo(PostTemplate);
