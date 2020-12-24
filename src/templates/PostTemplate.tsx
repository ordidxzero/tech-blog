import React from 'react';
import Layout from '../components/core/layout';
import SEO from '../components/core/seo';
import Utterances from '../components/post/Utterances';
import { ITemplateProps } from '../interfaces';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  tag: string[];
  prevStep: string[];
  category: string[];
  birthTime: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { html: __html, title, birthTime, category } = props.pageContext;
  return (
    <Layout>
      <SEO title={title} />
      <div className="post-container w-full h-full mt-12">
        <div className="flex flex-col justify-start items-center mb-20">
          <h1 className="m-0 mb-1 font-bold">{title}</h1>
          <div className="post-info text-xs flex justify-center items-center">
            <span>{birthTime}</span>
            {category &&
              category.map(item => (
                <>
                  <span className="mx-1">·</span>
                  <span key={item} className="capitalize">
                    {item}
                  </span>
                </>
              ))}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html }}></div>
      </div>
      <Utterances />
    </Layout>
  );
});

export default React.memo(PostTemplate);
