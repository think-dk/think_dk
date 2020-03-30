CREATE TABLE `SITE_DB`.`item_signee` (
  `id` int(11) NOT NULL auto_increment,
  `item_id` int(11) NOT NULL,

  `name` varchar(100) NOT NULL,
  `fullname` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',

  `signed_item_id` int(11) NULL,

  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_signee_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_signee_ibfk_2` FOREIGN KEY (`signed_item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
