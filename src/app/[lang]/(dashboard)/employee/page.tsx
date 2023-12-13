import Link from 'next/link';
import { getDictionary } from '../../../../lib/dictionary';
import { Locale } from '../../../../i18n.config';

export default async function Home({ params }: { params: { lang: Locale } }) {
	const { lang } = params;
	const { page } = await getDictionary(lang);

	return (
		<div>
			<h2>{page.home.title}</h2>
			<p>{page.home.dashboardDesc}</p>

			<div className="flex justify-center my-8">
				<Link href={`/employee/list`} className="no-underline">
					<button className="btn-primary">{page.home.viewList}</button>
				</Link>
			</div>

			<h2>{page.home.companyUpdate}</h2>

			<div className="card">
				<h3>{page.home.newMember}</h3>
				<p>{page.home.newMemberDesc}</p>
			</div>
			<div className="card">
				<h3>{page.home.newWebsite}</h3>
				<p>{page.home.newWebsiteDesc}</p>
			</div>
		</div>
	);
}
