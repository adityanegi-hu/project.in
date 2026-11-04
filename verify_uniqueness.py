import os, re

problems = []
viva1 = []
abstracts = []

for fname in os.listdir('projects'):
    if fname.endswith('.html') and fname != 'index.html':
        with open(os.path.join('projects', fname), 'r', encoding='utf-8') as f:
            content = f.read()
        
        m = re.search(r'Bottlenecks in Prior Art</h2>\s*<ul>(.*?)</ul>', content, re.DOTALL)
        if m:
            text = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            problems.append(text[:100])
        
        m2 = re.search(r'viva-answer">(.*?)</p>', content, re.DOTALL)
        if m2:
            text = re.sub(r'<[^>]+>', '', m2.group(1)).strip()
            viva1.append(text[:80])
        
        m3 = re.search(r'Architecture Overview</h2>\s*<p>(.*?)</p>', content, re.DOTALL)
        if m3:
            text = re.sub(r'<[^>]+>', '', m3.group(1)).strip()
            abstracts.append(text[:80])

print(f"Problem statements: {len(problems)} total, {len(set(problems))} unique")
print(f"Q1 viva answers:   {len(viva1)} total, {len(set(viva1))} unique")
print(f"Abstracts:         {len(abstracts)} total, {len(set(abstracts))} unique")

if len(set(problems)) == len(problems):
    print("\nALL problem statements are 100% unique!")
else:
    print(f"\nWARNING: {len(problems) - len(set(problems))} duplicate problem statements")

