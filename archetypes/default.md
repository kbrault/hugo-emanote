---
title: "{{ replace .File.ContentBaseName "-" " " | title }}" # Transforms my-article.md filename into "My Article" title
date: {{ .Date }}
weight: 10
tags: []
draft: true
---
