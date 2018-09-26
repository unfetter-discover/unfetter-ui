import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Report, StixCoreEnum } from 'stix';

@Component({
  selector: 'article-report-pane',
  templateUrl: './article-report-pane.component.html',
  styleUrls: ['./article-report-pane.component.scss']
})
export class ArticleReportPaneComponent implements OnInit {

  @Input()
  public form: FormGroup;
  @Input()
  public report: Report = new Report({ 
    name: 'Sample Text to Be Deleted',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus ducimus, illum explicabo architecto officia impedit quaerat aut iste dolore eius amet porro, qui recusandae voluptate in quo cumque repellendus minima.
      \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae animi non consequuntur facilis voluptatum odit sed impedit tempora assumenda, aliquid itaque cumque repellendus commodi excepturi 
      voluptatem necessitatibus nesciunt facere quaerat.A necessitatibus vero dolore aliquid ipsam voluptate explicabo, ea aperiam consectetur sunt deleniti vel enim tempore pariatur, voluptatem temporibus totam ex corporis doloribus numquam rem atque. Eligendi, beatae. A, corrupti!
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam dicta doloribus quod, corporis et. Tempore accusamus expedita minima officiis illum quod deserunt sint placeat velit hic! Tempora, consequatur dolor.
      \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nobis impedit vitae cumque omnis corporis! Dolorum, maiores? Aliquid, voluptas nam ipsa alias obcaecati exercitationem blanditiis recusandae quam aperiam quo beatae est!
      Amet distinctio, fugit aut, esse saepe perferendis nisi molestias sint voluptate optio excepturi laborum natus pariatur iste cum quo enim provident nam quod culpa nesciunt voluptatibus perspiciatis totam. Est, totam!
      Dicta officia, id at molestiae provident adipisci ut minus soluta? Incidunt culpa reprehenderit nesciunt ad reiciendis, repellat consequatur atque earum non quam dicta, aliquid sed veniam enim maxime. Quibusdam, quasi?`
  } as any);

  constructor() { }

  ngOnInit() {
  }

  public quoteText(e: Selection) {
    const previousContent = this.form.get('content').value;
    const text = e.toString();
    const quote = text.replace(/\n/g, '\n> ');
    const newContent = `${previousContent}\n> ${quote}\n> (Citation: ${this.report.name})\n>\n`;
    this.form.get('content').patchValue(newContent);
    
    const sources = this.form.get('metaProperties').get('relationships');

  }
}
